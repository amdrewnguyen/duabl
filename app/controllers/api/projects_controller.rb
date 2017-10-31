class Api::ProjectsController < ApplicationController
  before_action :require_logged_in, only: %i(index create update destroy)

  def index
    @projects = current_user.projects
  end

  def show
    @project = current_user.projects.find(params[:id])
  end

  def create
    @project = Project.new(project_params)
    @project.owner_id = current_user.id
    if @project.save
      render "api/projects/show"
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def update
    @project = current_user.projects.find(params[:id])
    if @project.update(project_params)
      render "api/projects/show"
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def destroy
    @project = current_user.projects.find(params[:id])
    if @project.destroy
      render "api/projects/show"
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  private

  def project_params
    params.require(:project).permit(:name, :description, :team_id)
  end
end
